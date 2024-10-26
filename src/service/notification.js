
export const getNotificationPermission = () => {
    if ('Notification' in window) {
        Notification.requestPermission()
    }
}

export const sendNotification = (notiText, noteId) => {
    if (Notification.permission === 'granted') {
        const notification = new Notification('Reminder from Taskify', {
            body: notiText,
            icon: '/public/logo.jpeg'
        });

        notification.onclick = (e) => {
            e.preventDefault();
            window.open(`${import.meta.env.VITE_DOMAIN_URL}/${noteId}`, '_blank');
        };
    }
}