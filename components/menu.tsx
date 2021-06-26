interface IProps {
    menus: string[],
    state: string,
    setState: (value: string) => void
}

function Menu({ menus, state, setState }: IProps) {
    return (
        <ul className="header-menu">
            {menus.map((menu, idx) => (
                <li key={`menu-${idx}`} className={state === menu ? "menu-active flex centerX centerY" : "flex centerX centerY"} onClick={() => setState(menu)}>{menu}</li>
            ))}
        </ul>
    )
}

export default Menu