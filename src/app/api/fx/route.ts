import { NextResponse } from "next/server";

/**
 * Taxa de câmbio EUR -> BRL para exibição dos preços no idioma PT.
 *
 * Fonte: Frankfurter (https://frankfurter.dev) — taxas de referência
 * diárias do Banco Central Europeu (BCE/ECB), atualizadas todo dia útil
 * por volta das 16:00 CET. Gratuita, sem chave de API.
 *
 * O resultado é cacheado por 24h (fetch revalidate), então o site faz
 * no máximo 1 requisição por dia ao BCE — "câmbio atualiza diariamente".
 * Se a API estiver inacessível, usa uma taxa de segurança (fallback).
 */

const FALLBACK_RATE = 6.2;
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 horas

export async function GET() {
  try {
    const res = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=BRL",
      { next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) throw new Error(`Frankfurter ${res.status}`);

    const data = (await res.json()) as {
      rates?: { BRL?: number };
      date?: string;
    };
    const rate = data.rates?.BRL;
    if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
      throw new Error("taxa invalida");
    }

    return NextResponse.json({
      rate,
      date: data.date ?? null,
      source: "ecb",
    });
  } catch {
    return NextResponse.json({
      rate: FALLBACK_RATE,
      date: null,
      source: "fallback",
    });
  }
}