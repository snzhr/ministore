import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Avatar from "../../ui/Avatar/Avatar";
import { IoCartOutline } from "react-icons/io5";
import { getUser } from "../../../apis/auth.api";
import { useQuery } from "@tanstack/react-query";
import Autocomplete from "../../ui/Autocomplete/Autocomplete";
import type { Product } from "../../../models/product";

const avatarPlaceholder = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

const Header = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: false,
  });

  const handleSelect = (item: Product) => {
    console.log(item);
    
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/products">MiniStore</Link>
      </div>
      <nav className={styles.nav}>
        <div>
          <Autocomplete onSelect={handleSelect} placeholder="Search" uniqueKey="id" label="title"/>
        </div>
        <Link to="/cart" className={styles.link}>
          <IoCartOutline style={{ fontSize: 30 }} />
        </Link>
        <Link to="/profile" className={styles.link}>
          <Avatar
            alt="avatar image"
            src={`${user?.avatar || avatarPlaceholder}`}
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
