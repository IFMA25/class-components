import { NextResponse } from 'next/server';
import { fetchCountriesSelected } from '@utils/fetchCountriesSelected';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const names = searchParams.getAll('name');

  if (names.length === 0) {
    return NextResponse.json({ error: 'No selected' }, { status: 400 });
  }

  try {
    const countries = await fetchCountriesSelected(names);

    const headers = ['Name', 'Capital', 'Population'];
    const rows = countries.map((c) => [c.name, c.capital, c.population]);
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${names.length}_selected_countries.csv"`,
      },
    });
  } catch (err) {
    console.error('Error CSV generation:', err);
    return NextResponse.json(
      { error: 'Error CSV generation' },
      { status: 500 }
    );
  }
}
