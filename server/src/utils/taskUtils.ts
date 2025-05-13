export const calculateProgress = (items: Array<{ completed: boolean }>): number => {
    if (!items || items.length === 0) return 0;
    const completedCount = items.filter(item => item.completed).length;
    return Math.round((completedCount / items.length) * 100);
};