import trackEvent from './trackEvent';

// Action and Label best practices
// https://support.google.com/analytics/answer/1033068?hl=en
export default function trackProjectListPageFilterByCategory(categorySlug) {
  trackEvent({
    category: 'Project List Page',
    action: `Filter Projects by Category - ${categorySlug}`,
    label: `Projects - ${categorySlug}`,
    //value: value,
    //nonInteraction: nonInteraction,
  });
};