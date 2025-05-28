import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../apis/auth.api";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { data, error, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: false
  });

  const navigate = useNavigate();

  if (isPending) return <div>Loading...</div>;
  if (error){
    navigate("/login");
  }

  return (
    <main className={styles.profile}>
      <div>
        <img src={data.avatar} alt="profile-image" />

        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Role: {data.role}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
