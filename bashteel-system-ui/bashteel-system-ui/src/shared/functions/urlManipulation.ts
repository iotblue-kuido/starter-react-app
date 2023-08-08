import { WorkersFilterForm } from '../../models/Workers';
import { Filter } from '../../models/Requests';
import { JobsFilterForm } from '../../models/Jobs';

export const buildRequestFilters: (
	data: WorkersFilterForm | JobsFilterForm,
) => Filter<string, any>[] = (data) => {
	const result: Filter<string, any>[] = [];
	Object.values(data).forEach(
		({ key, value, operator, entity }: Filter<string, any>) => {
			if (value && value.length)
				result.push({
					key,
					operator,
					value,
					entity,
				});
		},
	);
	return result;
};

export const injectParamsIntoUrl = <P = { [key: string]: string }>(
	url: string,
	params?: P,
): string => {
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== null || value !== undefined) {
				url = url.replace(
					`:${key}`,
					encodeURIComponent(value as string),
				);
			}
		});
	}
	return url;
};
