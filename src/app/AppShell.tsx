import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  Content,
} from "@carbon/react";
import { Asleep, Awake } from "@carbon/icons-react";
import { NAV_ITEMS, APP_NAME } from "../config";
import { useThemeMode } from "../theme";

/**
 * Top-level application shell: Carbon UI Shell header + side nav wrapping the
 * routed page content. Navigation items come from `config.NAV_ITEMS`; add new
 * pages there as they're built.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { mode, toggleMode } = useThemeMode();

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label={APP_NAME}>
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Toggle navigation"
              isCollapsible
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName as={Link} to="/" prefix="">
              {APP_NAME}
            </HeaderName>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label={
                  mode === "dark" ? "Switch to light theme" : "Switch to dark theme"
                }
                tooltipAlignment="end"
                onClick={toggleMode}
              >
                {mode === "dark" ? <Awake size={20} /> : <Asleep size={20} />}
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
              onSideNavBlur={onClickSideNavExpand}
            >
              <SideNavItems>
                {NAV_ITEMS.map((item) => (
                  <SideNavLink
                    key={item.path}
                    as={Link}
                    to={item.path}
                    isActive={location.pathname === item.path}
                  >
                    {item.label}
                  </SideNavLink>
                ))}
              </SideNavItems>
            </SideNav>
          </Header>
          <Content>{children}</Content>
        </>
      )}
    />
  );
}
