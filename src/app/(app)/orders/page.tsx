import { getOrders } from "@/actions/order";
import Container from "@/components/common/container";
import Items from "@/components/screen/orders/items";

export default async function Orders() {
  const { success, data } = await getOrders();
  if (success && data?.length === 0) {
    return <Container>No Orders Yet.</Container>;
  }
  return (
    <Container>
      <div className=" mx-4 lg:mx-0">
        <h1 className=" text-3xl font-semibold color-primary">My Orders</h1>
        {data && data?.length > 0 && <Items orders={data} />}
      </div>
    </Container>
  );
}
