type NotificationProps = {
    children: React.ReactNode;
};

export const Notification = ({ children }: NotificationProps) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm">
        {children}
    </div>
);