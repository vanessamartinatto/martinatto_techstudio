"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type * as ThreeNS from "three";

/**
 * 3D rotating VM Studio diamond (Three.js).
 * Transparent background, cyan + violet directional lights,
 * continuous Y rotation. Pauses when off-screen, slows down for
 * users preferring reduced motion, and falls back to the static
 * logo image when WebGL is unavailable.
 */
export function Logo3D({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let inView = true;
    const cleanups: Array<() => void> = [];

    let renderer: ThreeNS.WebGLRenderer | null = null;
    let geometry: ThreeNS.BufferGeometry | null = null;
    let material: ThreeNS.MeshStandardMaterial | null = null;
    let texture: ThreeNS.Texture | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      // Scene, camera, renderer (fully transparent background)
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 5;

      // WebGL unavailable -> static image fallback
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      // Absolute inside the aspect-square container: the canvas can never
      // influence layout height (no DPR feedback loops on live resizes)
      renderer.domElement.style.display = "block";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      container.appendChild(renderer.domElement);

      // Resize with the container (canvas is always square via aspect-square).
      // setSize also pins the canvas CSS size to the container, so the drawing
      // buffer (w * pixelRatio) can never inflate the layout — this prevents
      // the canvas/container feedback growth loop on high-DPR screens.
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = container;
        if (w === 0 || h === 0 || !renderer) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(container);
      cleanups.push(() => ro.disconnect());

      // Lighting: ambient + cyan and violet directional lights
      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const cyanLight = new THREE.DirectionalLight(0x22d3ee, 1.2);
      cyanLight.position.set(5, 5, 5);
      scene.add(cyanLight);
      const violetLight = new THREE.DirectionalLight(0x8b5cf6, 1.2);
      violetLight.position.set(-5, -5, 2);
      scene.add(violetLight);

      // Logo texture (transparent PNG)
      texture = new THREE.TextureLoader().load("/images/vm-logo-3d.png");
      texture.colorSpace = THREE.SRGBColorSpace;

      material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.05,
        // Keep the logo vivid regardless of light angle;
        // the directional lights still add a glossy sweep while rotating
        emissive: 0xffffff,
        emissiveMap: texture,
        emissiveIntensity: 0.55,
      });

      // Plane base size; X-scale follows the texture aspect once loaded
      geometry = new THREE.PlaneGeometry(2.5, 2.5);
      const logoMesh = new THREE.Mesh(geometry, material);
      texture.onload = () => {
        const img = texture?.image as
          | { width?: number; height?: number }
          | undefined;
        if (img?.width && img?.height) {
          logoMesh.scale.x = img.width / img.height;
        }
      };
      scene.add(logoMesh);

      // Rotation speed: continuous, gentler for reduced motion
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const speed = reducedMotion ? 0.003 : 0.015;

      // Render only while the section is on screen
      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(container);
      cleanups.push(() => io.disconnect());

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!inView) return;
        logoMesh.rotation.y += speed;
        renderer?.render(scene, camera);
      };
      animate();
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      cleanups.forEach((fn) => fn());
      geometry?.dispose();
      material?.dispose();
      texture?.dispose();
      if (renderer) {
        renderer.domElement.remove();
        renderer.dispose();
      }
    };
  }, []);

  if (failed) {
    return (
      <div className={className} aria-hidden="true">
        <Image
          src="/images/vm-logo-3d.png"
          alt=""
          width={1202}
          height={1222}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
