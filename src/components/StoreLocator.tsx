// src/components/StoreLocator.tsx

import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  StandardCard,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
      <div className="flex h-[calc(100vh-242px)] border">
        <div className="flex w-1/3 flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
            placeholder="Find Locations Near You"
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "builtin.location",
              },
            ]}
          />
          <VerticalResults
            customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
            CardComponent={StandardCard}
          />
        </div>
        <div className="w-2/3">
          <MapboxMap
            mapboxAccessToken={YEXT_PUBLIC_MAPBOX_API_KEY || ""}
          />
        </div>
      </div>
    </>
  );
};

export default StoreLocator;
