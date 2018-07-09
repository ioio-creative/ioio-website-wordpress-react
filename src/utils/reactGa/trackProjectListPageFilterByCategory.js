import trackEvent from './trackEvent';

export default function trackProjectListPageFilterByCategory(categorySlug) {
  trackEvent({
    category: 'Project List Page',
    action: 'Filter Project by Category',
    label: `Projects - ${categorySlug}`,
    //value: value,
    //nonInteraction: nonInteraction,
  });
};