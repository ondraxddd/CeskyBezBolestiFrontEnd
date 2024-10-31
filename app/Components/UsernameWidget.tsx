import Link from "next/link";

interface Props{
    username: string
}
function UsernameWidget({username}:Props) {

  return (
    <nav>
        <Link href="/">{username}</Link>
    </nav>
  );
};

export default UsernameWidget;
