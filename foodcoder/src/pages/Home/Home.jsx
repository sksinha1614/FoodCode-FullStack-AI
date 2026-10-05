import React from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useState } from "react";

const Home = () => {

  const [category, setCategory] = useState("All");
  return (
    <div className="container ">
      <main>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} searchText="" />
        
      </main>
    </div>
  );
};

export default Home;
