import { useAtom, useSetAtom } from 'jotai';
import { useId } from 'react';
import { useMap } from 'react-map-gl';
import { $layers, $layersCount } from '@/stores/layers';
import {
  DEFAULT_CONFIG as POINTS_DEFAULT_CONFIG,
  PointsConfigProps,
} from '@/components/controls/layers/list/types/points/generator';
import { LayerProps, LayerType } from '@/components/controls/layers/types';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

const DEFAULT_CONFIGS: Record<
  LayerType['type'],
  (p: PointsConfigProps) => Record<string, unknown>
> = {
  points: POINTS_DEFAULT_CONFIG,
  polygon: POINTS_DEFAULT_CONFIG,
  raster: POINTS_DEFAULT_CONFIG,
};

export const LayersAddListItem = ({ id, name, type }: LayerType) => {
  const uuid = useId();
  const { default: map } = useMap();
  const [layersCount, setLayersCount] = useAtom($layersCount);
  const setLayers = useSetAtom($layers);

  const handleAddLayer = () => {
    setLayers(
      (prevLayers) =>
        [
          ...prevLayers,
          {
            id: `${id}-${uuid}`,
            name: `${type}-${layersCount}`,
            type,
            config: DEFAULT_CONFIGS[type]({
              id: `${id}-${uuid}`,
              bbox: map!.getBounds().toArray().flat() as [number, number, number, number],
            }),
          },
        ] satisfies LayerProps[]
    );

    setLayersCount((prevCount) => prevCount + 1);
  };

  return (
    <DropdownMenuItem
      className="w-full cursor-pointer justify-center rounded-sm border border-gray-300 p-4 transition-colors hover:bg-gray-100"
      onClick={handleAddLayer}
    >
      {name}
    </DropdownMenuItem>
  );
};

export default LayersAddListItem;