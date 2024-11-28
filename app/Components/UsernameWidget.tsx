import "./ComponentStyles/UsernameWidget.css"
import Link from "next/link";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { Button } from '@nextui-org/button';
import { Urls } from "../Contexts/UrlsExport";

interface Props {
  username: string
}
function UsernameWidget({ username }: Props) {

  return (
    <nav>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="solid"
            id="username-button"
            disableAnimation
          >
            {username}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem href="/Statistics">Statistiky</DropdownItem>
          <DropdownItem href="https://youtube.com">Nastavení</DropdownItem>
          <DropdownItem key="edit" onClick={()=>{
            fetch(Urls.server + Urls.logout,
              {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            }
            )
            window.location.reload()
          }}>Odhlásit se</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* <Link href="/">{username}</Link> */}
    </nav>
  );
};

export default UsernameWidget;
