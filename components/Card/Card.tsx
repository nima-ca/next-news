import Link from "next/link";
import styles from "./Card.module.scss";

type CardProps = {
  title: string;
  description: string;
  url: string;
  img?: string;
  date: string;
  source: string;
};

const maxDescriptionLength = 150;
const maxTitleLength = 100;

const Card = ({ date, description, title, url, img, source }: CardProps) => {
  const text = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritati
    consectetur debitis fugit ex suscipit hic sequi nostrum eveniet!
    Officia, necessitatibus`;

  const formattedDate = new Intl.DateTimeFormat("en-US").format(new Date(date));
  const formattedDescription =
    description.length < maxDescriptionLength
      ? description
      : description.substring(0, maxDescriptionLength) + "...";
  const formattedTitle =
    title.length < maxTitleLength
      ? title
      : title.substring(0, maxTitleLength) + "...";

  return (
    <Link href={url} className={styles.card}>
      <div>{img && <img src={img} alt="" />}</div>
      <h4>{formattedTitle}</h4>
      <p>{formattedDescription}</p>
      <span>
        <p>{formattedDate}</p>
        <p>{source}</p>
      </span>
    </Link>
  );
};

export default Card;
