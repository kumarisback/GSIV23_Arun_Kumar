import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
interface ListProps {
  pages: number;
  currentPage: number;
  fetchMoreData: any;
  data: any;
}

const List: React.FC<ListProps> = ({
  pages,
  currentPage,
  fetchMoreData,
  data,
}) => {
  return (
   <InfiniteScroll
      dataLength={data ? data.length : 1}
      next={fetchMoreData}
      hasMore={currentPage < pages}
      loader={<h4></h4>}
    >
      <div className="containerStyle">
        {data?.map(
          (el: {
            id: number;
            title: string;
            overview: string;
            popularity: number;
            poster_path:string
          }) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                title={el.title}
                desc={el.overview}
                rating={el.popularity}
                img={el.poster_path}
              />
            );
          }
        )}
      </div>
    </InfiniteScroll>
  );
};

export default List;
