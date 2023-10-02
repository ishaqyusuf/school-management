import { Fragment, memo, useEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { PrimitiveDivProps } from "@radix-ui/react-tabs";
import { Label } from "../ui/label";

interface Props {
  options?: any[];
  value?: any;
  onChange?;
  Item?;
  itemText?;
  itemValue?;
  label?;
  transformValue?;
  transformText?;
  searchAction?;
  searchFn?;
  allowCreate?;
  formKey?;
  uppercase?: Boolean;
  rtl?: Boolean;
  placeholder?;
  form?;
}
function AutoComplete2({
  options,
  value,
  onChange,
  label,
  searchAction,
  allowCreate,
  itemText = "name",
  itemValue = "id",
  className,
  Item,
  searchFn,
  form,
  rtl,
  placeholder,
  formKey,
  uppercase,
}: Props & PrimitiveDivProps) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>(transformItems(options || []));
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<{
    id;
    name;
    data;
  }>();
  const watch = form && formKey ? form.getValues(formKey) : value;

  const searchMode = searchFn || searchAction;
  const debouncedQuery = useDebounce(query, searchMode ? 800 : 50);

  // const [searchable, setSearchable] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!searchMode && typing) setResults(filteredOptions());
    else {
      if (typing) {
        loadResult();
      }
    }
  }, [debouncedQuery, typing]);
  async function loadResult() {
    // console.log("RELOAD RESULTS", dirty);
    const { items } = searchFn
      ? await searchFn(debouncedQuery)
      : await searchAction({ q: debouncedQuery });
    // console.log(items);
    setItems(transformItems(items));
  }
  useEffect(() => {
    setResults(filteredOptions());
  }, [items]);
  function transformItems(items) {
    return items?.map((o) => {
      if (typeof o === "string") return { id: o, name: o, data: o };
      return {
        id: o?.[itemValue],
        name: o?.[itemText],
        data: o,
      };
    });
  }
  function getItem(value, by: "id" | "name" = "id") {
    let item = items?.find((o) => o?.[by] == value) as any;
    if (allowCreate && !item) return { id: value, name: value, data: value };
    return item;
  }
  function getItemText(value) {
    return (getItem(value) as any)?.name;
  }
  // useEffect(() => {
  //   console.log(getItem(watch));
  //   setSelected(getItem(watch));
  // }, [watch]);

  // useEffect(() => {
  //   const _items = transformItems(options || []);
  //   setItems(_items);
  //   console.log(label, "options changed");
  //   // setSelected(getItem(watch));
  // }, [options]);
  useEffect(() => {
    const _items = transformItems(options || []);
    setItems(_items);
    setSelected(getItem(watch));
    // setResults(filteredOptions());
    setQuery(watch);
  }, []);
  const filteredOptions = () => {
    const escapedText = !debouncedQuery
      ? ""
      : debouncedQuery?.toString().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    // Create a regex pattern to match the search string anywhere in the text
    const pattern = new RegExp(escapedText, "i");
    const filteredOptions = items?.filter((option) =>
      pattern.test(option.name)
    );
    return filteredOptions;
    // setFilters(filteredOptions);
    // return __options(options).filter(
    //   (option) => option.text.includes(data?.text) || !data?.text
    //   );
  };

  function valueChange(e) {
    // console.log("val change", e);
    setSelect(true);
    setSelected(e);
    if (form && formKey) {
      form.setValue(formKey, e?.id);
    }
    onChange && onChange(e);
  }
  const [focus, setFocus] = useState(false);
  const [select, setSelect] = useState(false);
  useEffect(() => {
    // console.log(label, selected);
  }, [selected]);
  function onFocus(e) {
    setTyping(false);
    setSelect(false);
    setFocus(true);
    // setSearchable(true);
    // if (!select) buttonRef?.current?.click();
    // else setSelect(false);
    if (searchMode && results.length == 0) loadResult();
  }
  useEffect(() => {
    if (typing && !select && !focus) {
      // console.log("BLURRRED:::", query);
      if (allowCreate) {
        setSelected({
          id: query,
          name: query,
          data: query,
        });
        if (form && formKey) {
          form.setValue(formKey, query);
        }
        onChange &&
          onChange({
            id: query,
            name: query,
            data: query,
          });
      }
    }
  }, [typing, select, focus, query]);
  function onBlur(e) {
    // setTimeout(() => {
    // setTyping(false);
    setTimeout(() => {
      setFocus(false);
    }, 500);
    // setDirty(true);
    // if (!select) {
    //   console.log("BLURR");
    //   console.log(selected);
    // }
    // }, 100);
  }
  const buttonRef = useRef<HTMLButtonElement>();
  const inputRef = useRef<HTMLInputElement>();

  const [isScrollBlocked, setIsScrollBlocked] = useState(false);

  const [position, setPosition] = useState<any>({ x: 0, y: 0 });

  const updatePosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.top,
        bottom: rect.bottom,
        top: rect.top,
      });
    }
  };
  function getSelected() {
    return getItem(watch);
  }
  useEffect(() => {
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    updatePosition();

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);
  return (
    <div className="grid gap-2">
      {label && <Label className={cn(rtl && "text-right")}>{label}</Label>}
      <Combobox value={selected} onChange={valueChange}>
        <div className="relative mt-1">
          <div
            className={cn(
              focus && "outline-none ring-2  ring-ring  ring-offset-2 ",
              "relative w-full ring-offset-background cursor-default overflow-hidden rounded-lg bg-white text-left  sm:text-sm border border-input h-8",
              className
            )}
          >
            <Combobox.Input
              onClick={() => {
                if (!select) buttonRef?.current?.click();
              }}
              onKeyDown={(e) => {
                setTyping(true);
              }}
              ref={inputRef as any}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={placeholder}
              className={cn(
                "w-full border-none spy-2 h-full focus:outline-none p-1 text-sm leading-5 text-gray-900 focus:ring-0",
                uppercase && "uppercase",
                rtl && "text-right"
              )}
              displayValue={(person) => (person as any).name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="absolute top-0 w-0 h-0 cursor-text">
              <Combobox.Button
                ref={buttonRef as any}
                className="w-full cursor-text  h-12s"
              >
                &nbsp;
              </Combobox.Button>
            </div>
            {/* <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button> */}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              style={{
                minWidth: `${inputRef.current?.clientWidth}px`,
                top: `${position.bottom}px`,
              }}
              className={cn(
                "fixed mt-1 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg   ring-opacity-5 border-input focus:outline-none min-w-au  sm:text-sm z-[9999]",
                `min-w-[]`
              )}
            >
              {results?.length === 0 && (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              )}
              {query?.length > 0 && allowCreate && (
                <Combobox.Option
                  className="w-0 h-0 opacity-0"
                  value={{ id: query, name: query }}
                >
                  Create `{query}``
                </Combobox.Option>
              )}
              {/* relative flex cursor-default select-none items-center rounded-sm
              px-2 py-1.5 text-sm outline-none aria-selected:bg-accent
              aria-selected:text-accent-foreground
              data-[disabled]:pointer-events-none data-[disabled]:opacity-50 */}
              {results?.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `flex cursor-default select-none items-center rounded-sm
              px-2 py-1.5 text-sm outline-none ${
                active ? "bg-accent text-accent-foreground" : ""
              }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <div
                        className={cn(
                          `block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`,
                          uppercase && "uppercase",
                          Item && "w-full"
                        )}
                      >
                        {Item ? <Item {...person} /> : person.name}
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
export default memo(AutoComplete2);
