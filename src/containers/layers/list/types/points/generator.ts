export type PointsConfigProps = {
  id: string;
  bbox: [number, number, number, number];
};

export const DEFAULT_CONFIG = ({ id, bbox }: PointsConfigProps) => {
  return {
    id,
    '@@type': 'ScatterplotLayer',
    data: {
      '@@function': 'setPointsData',
      count: '@@#params.count',
      bbox,
    },
    dataComparator: {
      '@@function': 'setPointsDataComparator',
    },
    dataTransform: (data: unknown[]) => {
      return data.map((d: any) => {
        return {
          ...d,
          properties: {
            value: Math.random(),
          },
        };
      });
    },
    lineWidthMinPixels: 1,
    getPosition: '@@=geometry.coordinates',
    // Radius
    radiusUnits: 'pixels',
    getRadius: '@@#params.getRadius',
    // Fill
    filled: '@@#params.filled',
    getFillColor: {
      '@@function': 'setColor',
      color: '@@#params.getFillColor',
      prop: 'value',
    },
    // Line
    stroked: '@@#params.stroked',
    lineWidthUnits: 'pixels',
    getLineColor: {
      '@@function': 'setColor',
      color: '@@#params.getLineColor',
      prop: 'value',
    },
    getLineWidth: '@@#params.getLineWidth',
    updateTriggers: {
      getFillColor: '@@#params.getFillColor',
      getLineColor: '@@#params.getLineColor',
      getLineWidth: '@@#params.getLineWidth',
      getRadius: '@@#params.getRadius',
    },
  };
};

export const DEFAULT_CONFIG_PARAMS = [
  {
    type: 'number',
    key: 'count',
    default: 100,
  },
  {
    type: 'boolean',
    key: 'filled',
    default: true,
  },
  {
    type: 'color',
    key: 'getFillColor',
    default: ['#f97316'],
  },
  {
    type: 'boolean',
    key: 'stroked',
    default: true,
  },
  {
    type: 'color',
    key: 'getLineColor',
    default: ['#000000'],
  },
  {
    type: 'number',
    key: 'getLineWidth',
    default: 1,
  },
  {
    type: 'number',
    key: 'getRadius',
    default: 10,
  },
];
