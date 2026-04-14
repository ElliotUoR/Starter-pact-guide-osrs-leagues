import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';

// This route is only reachable in local dev (output: 'export' is not set,
// so Next.js serves API routes normally). In the GitHub Pages build this
// file is never bundled.
export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const filePath = join(process.cwd(), 'src', 'data', 'persistedOverrides.json');
    await writeFile(filePath, JSON.stringify(body, null, 2) + '\n', 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
