export default async function page({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const { query } = await searchParams;
  return <div>Search Params for: {query}</div>;
}
