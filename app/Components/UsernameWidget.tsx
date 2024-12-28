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
      <Dropdown id="dropdown-username">
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
          <DropdownItem className="dropdownItemNextUI" href="/Statistics"><p>Statistiky</p></DropdownItem> 
          <DropdownItem className="dropdownItemNextUI" href="https://youtube.com"><p>Nastavení</p></DropdownItem>
          <DropdownItem className="dropdownItemNextUI" href="/" onClick={()=>{
            fetch(Urls.server + Urls.logout,
              {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            }
            )
            window.location.reload()
          }}><p>Odhlásit se</p></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* <Link href="/">{username}</Link> */}
    </nav>
  );
};

export default UsernameWidget;
