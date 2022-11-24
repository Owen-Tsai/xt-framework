import type { Node } from '@antv/x6/lib/model'
import type { Attr } from '@antv/x6/lib/registry/attr'
import type { PortManager } from '@antv/x6/lib/model/port'

// common attributes
const endpointAttrs = {
  body: {
    fill: '#E8FFEA',
    stroke: '#00B42A',
    strokeWidth: 1
  },
  label: {
    fill: '#00B42A'
  }
}

const stepAttrs = {
  body: {
    fill: '#E8F3FF',
    stroke: '#165DFF',
    strokeWidth: 1
  },
  label: {
    fill: '#165DFF'
  }
}

// ports
const portCommonAttrs = {
  circle: {
    r: 4,
    magnet: true,
    stroke: '#00B42A',
    strokeWidth: 1,
    fill: '#fff',
    // style: { visibility: 'hidden' }
  }
}
const ports: PortManager.Metadata = {
  groups: {
    top: {
      position: 'top',
      attrs: portCommonAttrs
    },
    bottom: {
      position: 'bottom',
      attrs: portCommonAttrs
    },
    left: {
      position: 'left',
      attrs: portCommonAttrs
    },
    right: {
      position: 'right',
      attrs: portCommonAttrs
    },
  },
  items: [
    { group: 'top' },
    { group: 'bottom' },
    { group: 'left' },
    { group: 'right' }
  ]
}

const buildingBlocks: Node.Metadata[] = [
  {
    label: '开始',
    shape: 'circle',
    width: 48,
    height: 48,
    attrs: endpointAttrs,
    ports
  },
  {
    label: '结束',
    shape: 'circle',
    width: 48,
    height: 48,
    attrs: endpointAttrs,
    ports
  },
  {
    label: '审批',
    shape: 'rect',
    height: 48,
    width: 80,
    attrs: stepAttrs,
    ports
  },
  {
    label: '抄送',
    shape: 'rect',
    height: 48,
    width: 80,
    attrs: stepAttrs,
    ports
  },
  {
    label: '网关',
    shape: 'polygon',
    height: 58,
    width: 58,
    attrs: {
      body: {
        fill: '#FFF3E8',
        stroke: '#F77234',
        strokeWidth: 1,
        refPoints: '0,10 10,0 20,10 10,20',
      },
      label: {
        fill: '#F77234'
      }
    },
    ports
  }
]

export default buildingBlocks
