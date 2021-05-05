import React from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { fetcherV1 } from "fetchers";
import { ErrorMessage } from "components/modules/ErrorMessage";
import { LoadingSpinner } from "components/modules/LoadingSpinner";
import { Header } from "./Header";
import { NoSeasonsText } from "./NoSeasonsText";
import { SeasonCard } from "./SeasonCard";

export function SeasonsIndexPageContent() {
  const { data, isLoading, isError } = useQuery("/seasons", () =>
    fetcherV1.get("/seasons").then((res) => res.data)
  );

  if (isError) {
    return (
      <ErrorMessage
        description="Refresca la página. Si no se soluciona, contacta a la persona que administra el sitio web."
        title="Hubo un error al traer las aperturas"
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { seasons } = data;
  if (!seasons || seasons.length === 0) {
    return (
      <Box>
        <Head>
          <title>Aperturas</title>
        </Head>
        <Header />
        <NoSeasonsText />
      </Box>
    );
  }

  return (
    <Box>
      <Head>
        <title>Aperturas</title>
      </Head>
      <Header />
      <SimpleGrid mt={10} columns={[1, null, null, 3]}>
        {seasons.map((season) => (
          <SeasonCard season={season} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
