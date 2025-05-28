import styles from './Skeleton.module.scss';

type SkeletonProps = {
    width: number;
    height: number;
}

function Skeleton({width, height}: SkeletonProps) {
  return (
    <div className={styles.skeleton} style={{width, height}}></div>
  )
}

export default Skeleton