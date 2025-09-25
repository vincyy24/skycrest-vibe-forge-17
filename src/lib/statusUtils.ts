export const getBadgeVariant = (status: string): "default" | "secondary" | "outline" => {
    if (["Registration Open", "Registrations Open"].includes(status)) return "default";
    if (status === "Early Bird") return "secondary";
    return "outline";
};

export const sanitizeLink = (link?: string) => {
    if (!link) return undefined;
    try {
        const url = new URL(link);
        return `${url.origin}${url.pathname}`;
    } catch {
        return link;
    }
};
