import Link from "next/link";
import styles from "./style.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
      </ul>
    </div>
  );
}
export default Header;
