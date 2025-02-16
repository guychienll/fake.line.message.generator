import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { LOCALES, SOCIAL_LINKS } from '@/constants';

function LanguageDropdown() {
    const router = useRouter();
    return (
        <NavbarItem id="translation">
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <span className="flex items-center gap-2">
                            {LOCALES[router.locale]}
                        </span>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Language Selection"
                    className="min-w-[150px]"
                    itemClasses={{
                        base: 'data-[hover=true]:bg-default-100',
                        title: 'text-sm font-medium',
                    }}
                >
                    {[...router.locales].sort().map((locale) => {
                        return (
                            <DropdownItem
                                key={locale}
                                href={`/${locale}`}
                                startContent={
                                    <i className="fas fa-check text-xs opacity-0 group-data-[selected=true]:opacity-100" />
                                }
                                className="group data-[selected=true]:font-medium"
                            >
                                {LOCALES[locale]}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        </NavbarItem>
    );
}

function SocialLinks() {
    return (
        <NavbarItem className="flex gap-x-4">
            {SOCIAL_LINKS.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-6 text-2xl transition-all duration-300 hover:scale-110 hover:text-primary"
                >
                    <i className={link.icon} />
                </a>
            ))}
        </NavbarItem>
    );
}

function SiteTitle() {
    return (
        <h1 className="select-none bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text font-dynapuff text-3xl tracking-wider text-transparent">
            FLMG
        </h1>
    );
}

function NavigationBar() {
    return (
        <Navbar isBlurred={true}>
            <NavbarBrand>
                <SiteTitle />
            </NavbarBrand>
            <NavbarContent justify="end">
                <LanguageDropdown />
                <SocialLinks />
            </NavbarContent>
        </Navbar>
    );
}

export default NavigationBar;
