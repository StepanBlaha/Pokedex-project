import NormalMenu from "./Nomal"
import HamburgerMenu from "./Hamburger"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export default function NavbarMenu(){
    const { width } = useWindowDimensions()
    return (
        <>
            {width > 800 ? <NormalMenu /> : <HamburgerMenu />}
        </>
    );
}