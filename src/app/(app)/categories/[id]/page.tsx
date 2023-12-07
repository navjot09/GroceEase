export default function CategoriesDetails({
  params,
}: {
  params: { id: string };
}) {
  console.log(params);
  return <div>Categories Details {params.id}</div>;
}
