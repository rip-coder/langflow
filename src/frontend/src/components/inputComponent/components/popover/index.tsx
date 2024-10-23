import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverContentWithoutPortal,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import React from "react";

const CustomInputPopover = ({
  id,
  refInput,
  onInputLostFocus,
  selectedOption,
  setSelectedOption,
  selectedOptions,
  setSelectedOptions,
  value,
  autoFocus,
  disabled,
  setShowOptions,
  required,
  className,
  password,
  pwdVisible,
  editNode,
  placeholder,
  onChange,
  blurOnEnter,
  options,
  optionsPlaceholder,
  optionButton,
  optionsButton,
  handleKeyDown,
  showOptions,
}) => {
  const PopoverContentInput = editNode
    ? PopoverContent
    : PopoverContentWithoutPortal;

  const handleRemoveOption = (optionToRemove, e) => {
    e.stopPropagation(); // Prevent the popover from opening when removing badges
    if (setSelectedOptions) {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== optionToRemove),
      );
    } else if (setSelectedOption) {
      setSelectedOption("");
    }
  };

  console.log(pwdVisible);

  return (
    <Popover modal open={showOptions} onOpenChange={setShowOptions}>
      <PopoverAnchor>
        <div
          className={cn(
            "primary-input border-1 flex h-full flex-wrap items-center px-3 placeholder:text-placeholder",
          )}
          onClick={() => !disabled && setShowOptions(true)}
        >
          {selectedOptions?.length > 0 ? (
            selectedOptions.map((option) => (
              <Badge
                key={option}
                variant="secondary"
                className="m-1 flex items-center gap-1 truncate"
              >
                <div className="truncate">{option}</div>
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={(e) => handleRemoveOption(option, e)}
                />
              </Badge>
            ))
          ) : selectedOption ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 truncate"
            >
              <div className="max-w-36 truncate">{selectedOption}</div>
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={(e) => handleRemoveOption(selectedOption, e)}
              />
            </Badge>
          ) : null}

          {selectedOption?.length === 0 && (
            <input
              id={id}
              ref={refInput}
              type={!pwdVisible && password ? "password" : "text"}
              onBlur={onInputLostFocus}
              value={value || ""}
              autoFocus={autoFocus}
              disabled={disabled}
              required={required}
              className="primary-input flex-1 border-none bg-transparent p-0 shadow-none outline-none ring-0 ring-offset-0 placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={
                selectedOptions?.length > 0 || selectedOption ? "" : placeholder
              }
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={(e) => {
                handleKeyDown?.(e);
                if (blurOnEnter && e.key === "Enter") refInput.current?.blur();
              }}
              data-testid={editNode ? id + "-edit" : id}
            />
          )}
        </div>
      </PopoverAnchor>
      <PopoverContentInput
        className="noflow nowheel nopan nodelete nodrag p-0"
        style={{ minWidth: refInput?.current?.clientWidth ?? "200px" }}
        side="bottom"
        align="start"
      >
        <Command
          filter={(value, search) => {
            if (
              value.toLowerCase().includes(search.toLowerCase()) ||
              value.includes("doNotFilter-")
            )
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={optionsPlaceholder} />
          <CommandList>
            <CommandGroup>
              {options.map((option, id) => (
                <CommandItem
                  key={option + id}
                  value={option}
                  onSelect={(currentValue) => {
                    if (setSelectedOption) {
                      setSelectedOption(
                        currentValue === selectedOption ? "" : currentValue,
                      );
                    }
                    if (setSelectedOptions) {
                      setSelectedOptions(
                        selectedOptions?.includes(currentValue)
                          ? selectedOptions.filter(
                              (item) => item !== currentValue,
                            )
                          : [...(selectedOptions || []), currentValue],
                      );
                    }
                    !setSelectedOptions && setShowOptions(false);
                  }}
                  className="group"
                >
                  <div className="flex w-full items-center justify-between">
                    <span>{option}</span>
                    {(selectedOptions?.includes(option) ||
                      selectedOption === option) && (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CommandItem>
              ))}
              {optionsButton}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContentInput>
    </Popover>
  );
};

export default CustomInputPopover;
