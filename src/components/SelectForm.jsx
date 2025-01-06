import Select from "react-select";

const options = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "animation", label: "Animation" },
  { value: "biography", label: "Biography" },
  { value: "comedy", label: "Comedy" },
  { value: "crime", label: "Crime" },
  { value: "documentary", label: "Documentary" },
  { value: "drama", label: "Drama" },
  { value: "family", label: "Family" },
  { value: "fantasy", label: "Fantasy" },
  { value: "film-noir", label: "Film-Noir" },
  { value: "game-show", label: "Game-Show" },
  { value: "history", label: "History" },
  { value: "horror", label: "Horror" },
  { value: "music", label: "Music" },
  { value: "musical", label: "Musical" },
  { value: "mystery", label: "Mystery" },
  { value: "news", label: "News" },
  { value: "reality-tv", label: "Reality-TV" },
  { value: "romance", label: "Romance" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "sport", label: "Sport" },
  { value: "talk-show", label: "Talk-Show" },
  { value: "thriller", label: "Thriller" },
  { value: "war", label: "War" },
  { value: "western", label: "Western" },
];

export default function SelectForm({ defaultValue, onChange }) {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      isMulti
      name="genres"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      classNames={{
        control: () => "w-5/6 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto",
      }}
    />
  );
}
