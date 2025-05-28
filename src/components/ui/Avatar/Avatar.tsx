import styles from "./Avatar.module.scss";

type AvatarProps = {
  src: string;
  alt: string;
  avatarStyles?: React.CSSProperties;
};

function Avatar({ src, avatarStyles }: AvatarProps) {
  return (
    <div
      className={styles.avatar}
      style={{ ...avatarStyles, backgroundImage: `url(${src})` }}
    ></div>
  );
}

export default Avatar;
