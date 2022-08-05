import React from "react";
import Head from "next/head";
import SearchHeader from "../components/SearchHeader";
import Response from "../Response";

const Search = ({ results }) => {
  console.log("results =>", results);
  return (
    <div>
      <Head>
        <title>Search Page</title>
      </Head>

      {/*  Search Header */}
      <SearchHeader />

      {/*  Search Result */}
    </div>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const mockData = true;

  const data = mockData
    ? Response
    : await fetch(`
        https://www.googleapis.com/customsearch/v1?key=${
          process.env.API_KEY
        }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
        context.query.searchType && "&searchType=image"
      }`).then((res) => res.json());

  return {
    props: { results: data },
  };
}
