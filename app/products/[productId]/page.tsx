import Image from "next/image";
import { Grid2, Stack, Typography } from "@mui/material";
import Checkout from "@/app/checkout/checkout";
import { getProductImage } from "../product-image";
import getProduct from "./get-product";

interface SingleProductProps {
  params: { productId: number };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <Grid2 container marginBottom={"2rem"} rowGap={3}>
      {product.imageExists && (
        <Grid2 size={{ md: 6, xs: 12 }}>
          <Image
            src={getProductImage(product.id)}
            alt="Picture of product"
            width={0}
            height={0}
            className="w-auto md:w-3/4 h-auto"
            sizes="100vw"
          />
        </Grid2>
      )}
      <Grid2 size={{ md: 6, xs: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">${product.price}</Typography>
          <Checkout productId={product.id} />
        </Stack>
      </Grid2>
    </Grid2>
  );
}
