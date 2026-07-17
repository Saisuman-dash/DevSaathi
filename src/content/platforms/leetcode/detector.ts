export function isProblemPage(): boolean {
    return window.location.pathname.startsWith("/problems/");
}