import { Page, Layout, EmptyState } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

export function ProductMetafieldPage() {

  const [data, setData] = useState([]);

  const app = useAppBridge();

  async function fetchData() {
      const token = await getSessionToken(app);
      const resource = 'products/6810701430922/metafields';

      const response = await fetch(`/api/v1/${resource}`, {
          headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json();

      setData(data);

      console.log(data);

      return data;
  }

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <Page>
      <Layout>
        <EmptyState
          heading="Test loading product metafields via REST"
          action={{
            content: "Log Product Metafield",
            onAction: () => fetchData(),
          }}
          image={img}
          imageContained
        >
        </EmptyState>
      </Layout>
    </Page>
  );
}