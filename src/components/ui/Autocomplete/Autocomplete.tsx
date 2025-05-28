import React, { useEffect, useState } from "react";
import styles from "./Autocomplete.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../apis/product.api";
import Loader from "../Loader/Loader";

interface AutocompleteOptions<T> {
  placeholder?: string;
  label: keyof T;
  uniqueKey: keyof T;
  onSelect?: (item: T) => void;
  delay?: number;
}

export default function Autocomplete<T>({
  placeholder,
  label,
  uniqueKey,
  onSelect,
  delay = 500,
}: AutocompleteOptions<T>) {
  const [userInput, setUserInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [debouncedUserInput, setDebouncedUserInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedUserInput(userInput);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [userInput]);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts({ limit: 5, search: debouncedUserInput }),
    enabled: false,
  });

  useEffect(() => {
    if (debouncedUserInput !== "") {
      refetch();
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [debouncedUserInput, refetch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSelect = (item: T) => {
    // setUserInput(item[label]);
    setShowOptions(false);
    onSelect(item);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (data) {
      if (e.key === "ArrowDown" && selectedIndex < data?.length - 1) {
        setSelectedIndex((prev) => prev + 1);
      }

      if (e.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
      }

      if (e.key === "Enter") {
        handleSelect(data[selectedIndex]);
      }

      if (e.key === "Escape") {
        setShowOptions(false);
      }
    }
  };

  const handleHover = (_: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.main}>
      <input
        type="text"
        placeholder={placeholder}
        value={userInput}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      {userInput && (
        <button
          onClick={() => {
            setUserInput(""), setShowOptions(false);
          }}
        >
          &#10005;
        </button>
      )}
      {showOptions && (
        <ul className={styles.options}>
          {isFetching ? (
            <Loader />
          ) : (
            data?.map((option: T, index: number) => {
              return (
                <li
                  className={selectedIndex === index ? styles["selected"] : ""}
                  key={option[uniqueKey]}
                  onClick={() => handleSelect(option)}
                  onMouseOver={(e) => handleHover(e, index)}
                >
                  {option[label]}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
