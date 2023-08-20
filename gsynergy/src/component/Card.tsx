import React from "react";
import { useNavigate } from "react-router-dom";
import key from "../secret/key";

interface CardProps {
  title: string;
  desc: string;
  rating: number;
  id: number;
  img: string;
}

const Card: React.FC<CardProps> = ({ title, desc, rating, id, img }) => {
  const nav = useNavigate();

  return (
    <div className="card" onClick={() => nav(`details/${id}`)}>
        <img src={key.IMAGE_URL + img} />
      <div className="content">
        <div className="title-rating">
          <div className="title">{title}</div>
          <div className="rating">{rating}</div>
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  );
};

export default Card;
