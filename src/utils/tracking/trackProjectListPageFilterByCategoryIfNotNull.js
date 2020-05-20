import trackEvent from './trackEvent';

// Action and Label best practices
// https://support.google.com/analytics/answer/1033068?hl=en
function trackProjectListPageFilterByCategory(categorySlug) {
  trackEvent({
    category: 'Project List Page - Filter Projects by Category',
    action: `Filter Projects by Category - ${categorySlug}`,
    label: `Projects - ${categorySlug}`
    //value: value,
    //nonInteraction: nonInteraction,
  });
}

export default function trackProjectListPageFilterByCategoryIfNotNull(
  categorySlug
) {
  if (categorySlug) {
    trackProjectListPageFilterByCategory(categorySlug);
  }
}
