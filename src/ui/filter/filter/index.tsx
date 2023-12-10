import { useTranslation } from 'next-i18next';
import { cloneElement, Fragment, ReactElement, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button } from '@theme/button';
import { useFilterStore } from '@store/modules/common/filter/useFilterStore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { Tooltip } from '@theme/tooltip';
import { Box, Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { MEDIA_XL, MEDIA_LG, MEDIA_MD, MEDIA_SM, useWindowSize } from '@hooks/useWindowSize';

type TFilters = ReactElement[] | undefined;
const onGoTop = () => window.scrollTo(0, 0);

interface IButtonLimitProps {
  filtersBarMore?: TFilters;
}
const ButtonLimit = (props: IButtonLimitProps) => {
  const { filtersBarMore } = props;
  if (!filtersBarMore || (filtersBarMore && filtersBarMore.length <= 0)) return null;

  const TooltipHtml = (
    <Fragment>
      {filtersBarMore.map((f, index) => (
        <div key={index}>{f.props.placeholder}</div>
      ))}
    </Fragment>
  );

  return (
    <Tooltip title={TooltipHtml}>
      <Button variant="text">+{filtersBarMore.length}</Button>
    </Tooltip>
  );
};

interface IButtonGoTopProps {
  goTop?: boolean;
}
const ButtonGoTop = (props: IButtonGoTopProps) => {
  const { goTop } = props;
  const { t } = useTranslation();
  if (!goTop) return null;
  return (
    <Button variant="text" startIcon={<ArrowUpwardIcon />} onClick={onGoTop}>
      {t('common:filter-go-top')}
    </Button>
  );
};

interface IButtonMoreProps {
  hasMore?: boolean;
  filtersMoreSel?: TFilters;
}
const ButtonMore = observer((props: IButtonMoreProps) => {
  const { hasMore, filtersMoreSel } = props;
  const { isMore, setIsMore } = useFilterStore();
  const { t } = useTranslation();

  if (!hasMore) return null;

  const TooltipHtml = (
    <Fragment>
      {filtersMoreSel?.map((f, index) => <div key={index}>{f.props.placeholder}</div>)}
    </Fragment>
  );

  if (isMore) {
    return (
      <Button
        variant="outlined"
        color="greyLight"
        onClick={() => setIsMore(false)}
        endIcon={<TuneIcon />}
      >
        {t('common:filter-less-filters')}
      </Button>
    );
  }

  if (filtersMoreSel && filtersMoreSel?.length > 0) {
    return (
      <Tooltip title={TooltipHtml}>
        <Button variant="outlined" onClick={() => setIsMore(true)}>
          {`+${filtersMoreSel.length} ${t('common:filter-more')}`}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button
      variant="outlined"
      color="greyLight"
      onClick={() => setIsMore(true)}
      endIcon={<TuneIcon />}
    >
      {t('common:filter-more-filters')}
    </Button>
  );
});

interface IButtonResetProps {
  reset?: boolean;
}
const ButtonReset = observer((props: IButtonResetProps) => {
  const { reset } = props;
  const { clearFilters, hasFilters } = useFilterStore();
  const { t } = useTranslation();
  if (!reset || !hasFilters) return null;
  return (
    <Button variant="text" startIcon={<CloseIcon />} onClick={() => clearFilters()}>
      {t('common:filter-clear')}
    </Button>
  );
});

interface IFilterActionsProps {
  goTop?: boolean;
  hasMore?: boolean;
  reset?: boolean;
  filtersMoreSel?: TFilters;
  filtersBarMore?: TFilters;
}
const FilterActions = observer((props: IFilterActionsProps) => {
  const { goTop, hasMore, reset, filtersBarMore, filtersMoreSel } = props;
  return (
    <Stack direction="row" spacing={2}>
      <ButtonLimit filtersBarMore={filtersBarMore} />
      <ButtonGoTop goTop={goTop} />
      <ButtonMore hasMore={hasMore} filtersMoreSel={filtersMoreSel} />
      <ButtonReset reset={reset} />
    </Stack>
  );
});

const getFiltersPerRow = (width: number, limit: number) => {
  let count = 6;
  if (width <= MEDIA_XL) count = 5;
  if (width <= MEDIA_LG) count = 4;
  if (width <= MEDIA_MD) count = 3;
  if (width <= MEDIA_SM) count = 2;
  return limit >= count ? count : limit;
};

interface IProps {
  className?: string;
  selected?: boolean;
  limit?: number;
  lines?: number;
  reset?: boolean;
  actions?: boolean;
  filters?: ReactElement[];
  loading?: boolean;
}
export const Filter = observer((props: IProps) => {
  const {
    selected,
    limit = 6,
    lines = 1,
    reset = true,
    actions = true,
    filters: filtersSrc,
    loading,
  } = props;

  const { filters: query, isMore } = useFilterStore();
  const { t } = useTranslation();

  const [filtersCnt, setFiltersCnt] = useState<number>(limit);

  const [filters, setFilters] = useState<TFilters>();
  const [filtersMore, setFiltersMore] = useState<TFilters>();
  const [filtersMoreSel, setFiltersMoreSel] = useState<TFilters>();

  const [filtersBar, setFiltersBar] = useState<TFilters>();
  const [filtersBarMore, setFiltersBarMore] = useState<TFilters>();

  // --- helper functions ---
  const mapFilters = (f: ReactElement, i: number) => {
    return cloneElement(f, { key: i });
  };
  const filterFiltersSelected = (f: ReactElement) => {
    return Object.keys(query).includes(f.props.name);
  };

  // --- get filters cnt per row ---
  const size = useWindowSize();
  useEffect(() => {
    setFiltersCnt(getFiltersPerRow(size.width, limit));
  }, [size.width]);

  // --- filters cnt ---
  useEffect(() => {
    setFilters(filtersSrc?.slice(0, filtersCnt * lines - 1));
    setFiltersMore(filtersSrc?.slice(filtersCnt * lines - 1));
  }, [filtersCnt, filtersSrc]);

  // --- filters selected cnt ---
  useEffect(() => {
    const srcSel = filtersSrc?.filter(filterFiltersSelected);
    const moreSel = filtersMore?.filter(filterFiltersSelected);

    setFiltersMoreSel(moreSel);
    setFiltersBar(srcSel?.slice(0, filtersCnt - 1));
    setFiltersBarMore(srcSel?.slice(filtersCnt - 1));
  }, [filtersCnt, filtersMore, filtersSrc, query]);

  const hasMore = filtersMore && filtersMore?.length > 0;
  let filtersAll: ReactElement[] = [];
  if (filters) filtersAll = filtersAll.concat(filters);
  if (filtersMore && isMore) filtersAll = filtersAll.concat(filtersMore);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${filtersCnt}, 1fr)`,
          gap: 2,
        }}
      >
        {Array.from(Array(filtersCnt)).map((_, index) => (
          <Box key={index} sx={{ pt: '8.5px', pb: '8.5px' }}>
            <Skeleton />
          </Box>
        ))}
      </Box>
    );
  }

  if (selected) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${filtersCnt}, 1fr)`,
          gap: 2,
        }}
      >
        {filtersBar?.map(mapFilters)}
        {actions && <FilterActions goTop reset={false} filtersBarMore={filtersBarMore} />}
      </Box>
    );
  }

  if (!filtersSrc || filtersSrc?.length === 0) {
    return (
      <Box>
        <Button variant="outlined" disabled>
          {t('common:no-filters')}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${filtersCnt}, 1fr)`,
        gap: 2,
      }}
    >
      {filtersAll.map(mapFilters)}
      {actions && <FilterActions hasMore={hasMore} reset={reset} filtersMoreSel={filtersMoreSel} />}
    </Box>
  );
});
