import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  ChevronDownIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Shop2 from "./Shop2";

const sortOptions = [
  { name: "Price: Low to High", value: "priceLowToHigh" },
  { name: "Price: High to Low", value: "priceHighToLow" },
];

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Toyota", label: "Toyota", checked: false },
      { value: "Honda", label: "Honda", checked: false },
    ],
  },
  {
    id: "ownership",
    name: "Ownership",
    options: [
      { value: "First Owner", label: "First Owner", checked: false },
      { value: "Second Owner", label: "Second Owner", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "Red", label: "Red", checked: false },
      { value: "Blue", label: "Blue", checked: false },
    ],
  },
  {
    id: "fuel_type",
    name: "Fuel Type",
    options: [
      { value: "Petrol", label: "Petrol", checked: false },
      { value: "Diesel", label: "Diesel", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-500000", label: "0-500,000", checked: false },
      { value: "500001-1000000", label: "500,001-1,000,000", checked: false },
    ],
  },
  {
    id: "km_driven",
    name: "Kilometers Driven",
    options: [
      { value: "0-50000", label: "0-50,000", checked: false },
      { value: "50001-100000", label: "50,001-100,000", checked: false },
    ],
  },
];

export default function CarFilters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchFilteredCars();
  }, [selectedFilters, selectedSort]);

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const handleFilterChange = (sectionId, value, checked) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [sectionId]: {
        ...prevState[sectionId],
        [value]: checked,
      },
    }));
  };

  const fetchFilteredCars = async () => {
    try {
      const filtersToApply = Object.keys(selectedFilters).reduce(
        (acc, sectionId) => {
          const selectedOptions = Object.keys(
            selectedFilters[sectionId]
          ).filter((key) => selectedFilters[sectionId][key]);
          if (selectedOptions.length > 0) {
            acc[sectionId] = selectedOptions;
          }
          return acc;
        },
        {}
      );

      const params = new URLSearchParams();

      // Convert filters to query params
      if (filtersToApply.brand) params.append("brand", filtersToApply.brand);
      if (filtersToApply.ownership)
        params.append("ownership", filtersToApply.ownership);
      if (filtersToApply.color) params.append("color", filtersToApply.color);
      if (filtersToApply.fuel_type)
        params.append("fuel_type", filtersToApply.fuel_type);

      if (filtersToApply.price) {
        const priceRange = filtersToApply.price[0].split("-");
        if (priceRange[0]) params.append("price_min", priceRange[0]);
        if (priceRange[1]) params.append("price_max", priceRange[1]);
      }

      if (filtersToApply.km_driven) {
        const kmRange = filtersToApply.km_driven[0].split("-");
        if (kmRange[1]) params.append("km_driven", kmRange[1]);
      }

      // Fetch data from the API
      const response = await fetch(`http://localhost:3000/api/filter/cars?${params.toString()}`);
      const data = await response.json();
      if (response.ok) {
        setCars(data.cars);
      } else {
        console.error("Error fetching filtered cars:", data.message);
      }
    } catch (error) {
      console.error("Error fetching filtered cars:", error);
    }
  };

  return (
    <div className="bg-white">
      {/* Mobile Filters */}
      {/* Your mobile filter UI */}
      
      {/* Desktop Filters */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Your filters UI */}
        
        {/* Car Listing */}
        <Shop2 filteredCars={cars} />
      </main>
    </div>
  );
}