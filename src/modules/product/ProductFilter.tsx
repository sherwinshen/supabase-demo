import { Select } from "antd";
import { useSearchParams } from "react-router-dom";

function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceGreaterThan = searchParams.get("priceGreaterThan") || "";

  const handleChange = (value: string) => {
    setSearchParams({ priceGreaterThan: value });
  };
  return (
    <div className="flex items-center gap-2">
      <span className="leading-[32px]">Price:</span>
      <Select
        defaultValue={priceGreaterThan}
        style={{ width: 240 }}
        onChange={handleChange}
        options={[
          { value: "10", label: "Greater than 10" },
          { value: "100", label: "Greater than 100" },
          { value: "1000", label: "Greater than 1000" },
          { value: "10000", label: "Greater than 10000" },
        ]}
      />
    </div>
  );
}

export default ProductFilter;
