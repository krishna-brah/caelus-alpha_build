import React from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Box,
  Chip,
  Popover,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  styled,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  TuneRounded as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const SearchWrapper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(0.5, 2),
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
}));

const FilterChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: alpha(theme.palette.primary.main, 0.1),
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.15),
  },
}));

interface FilterOption {
  label: string;
  value: string;
  checked: boolean;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
}

interface FilterSearchBarProps {
  searchPlaceholder?: string;
  filterGroups: FilterGroup[];
  onSearch: (value: string) => void;
  onFilterChange: (group: string, value: string, checked: boolean) => void;
  activeFilters: { group: string; value: string }[];
  onClearFilters: () => void;
}

export const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  searchPlaceholder = 'Search...',
  filterGroups,
  onSearch,
  onFilterChange,
  activeFilters,
  onClearFilters,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [searchValue, setSearchValue] = React.useState('');

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <SearchWrapper>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchValue && (
          <IconButton size="small" onClick={handleClearSearch}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton onClick={handleFilterClick}>
          <FilterIcon />
        </IconButton>
      </SearchWrapper>

      {activeFilters.length > 0 && (
        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {activeFilters.map(({ group, value }) => (
            <FilterChip
              key={`${group}-${value}`}
              label={value}
              onDelete={() => onFilterChange(group, value, false)}
              size="small"
            />
          ))}
          <Button
            size="small"
            onClick={onClearFilters}
            sx={{ ml: 1, textTransform: 'none' }}
          >
            Clear all
          </Button>
        </Box>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          {filterGroups.map((group) => (
            <Box key={group.name} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {group.name}
              </Typography>
              {group.options.map((option) => (
                <MenuItem key={option.value} dense>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={option.checked}
                        onChange={(e) =>
                          onFilterChange(group.name, option.value, e.target.checked)
                        }
                        size="small"
                      />
                    }
                    label={option.label}
                  />
                </MenuItem>
              ))}
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};