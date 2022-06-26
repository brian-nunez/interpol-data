import { useState } from "react";
import nationality from "@/utils/nationality";
import gender from "@/utils/gender";
import Input from "./input";
import Select from "./select";

export const initialValues = {
  name: '', // first name
  forename: '', // last name
  nationality: '', // nationality option
  sexId: gender[0].value, // gender option
  ageMin: '', // min age
  ageMax: '', // max age
  arrestWarrantCountryId: '', // nationality option
  freeText: '', // keywords
};

type SidebarProps = {
  onFormSubmit: (values: typeof initialValues) => void,
}

function Sidebar({
  onFormSubmit,
}: SidebarProps) {
  const [values, setValues] = useState(initialValues);

  const onChange = ({ target: { value, name } }: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: `${value}`,
    }))
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    onFormSubmit(values);
    setValues(initialValues);
  };

  return (
    <div className="col-span-3">
      <div className="border border-gray-700 p-4 font-sans font-light my-4 py-4">
        <h1 className="text-3xl text-center text-gray-700 font-semibold">Filter criteria</h1>
        <form
          onSubmit={onSubmit}
          className="w-full"
        >
          <Input
            type="text"
            label="Name"
            name="name"
            onChange={onChange}
            value={values.name}
          />
          <Input
            type="text"
            label="Forename"
            name="forename"
            onChange={onChange}
            value={values.forename}
          />
          <Select
            name="nationality"
            label="Nationality"
            onChange={onChange}
            value={values.nationality}
            className="w-full"
            options={nationality}
          />
          <Select
            name="sexId"
            label="Gender"
            onChange={onChange}
            value={values.sexId}
            options={gender}
          />
          <Input
            type="number"
            label="Minimum Age"
            name="ageMin"
            onChange={onChange}
            min={0}
            max={100}
            value={values.ageMin}
          />
          <Input
            type="number"
            label="Maximum Age"
            name="ageMax"
            onChange={onChange}
            min={0}
            max={100}
            value={values.ageMax}
          />
          <Select
            name="arrestWarrantCountryId"
            label="Wanted By"
            onChange={onChange}
            value={values.arrestWarrantCountryId}
            options={nationality}
          />
          <Input
            type="text"
            label="Keywords"
            name="freeText"
            onChange={onChange}
            value={values.freeText}
          />
          <button
            type="submit"
            className="my-2 w-full px-4 py-2 font-semibold text-base bg-gray-700 text-white rounded-none shadow-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
