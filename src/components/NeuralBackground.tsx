import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TreeNode extends d3.SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
  depth: number;
  parent?: string;
  children?: string[];
  dataPulse?: number;
}

interface TreeLink extends d3.SimulationLinkDatum<TreeNode> {
  source: TreeNode | string;
  target: TreeNode | string;
  dataFlow?: number;
}

const NeuralBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<TreeNode, TreeLink> | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!svgRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);

    // Create tree structure
    const createTreeNodes = (): TreeNode[] => {
      const nodes: TreeNode[] = [];
      const centerX = width / 2;
      const centerY = height * 0.75;

      // Root node
      nodes.push({
        id: 'root',
        x: centerX,
        y: centerY,
        depth: 0,
        dataPulse: 0
      });

      // Level 1 - 3 main branches
      const level1Nodes = 3;
      for (let i = 0; i < level1Nodes; i++) {
        const angle = (Math.PI * i) / level1Nodes - Math.PI / 2;
        const distance = 120;
        nodes.push({
          id: `l1_${i}`,
          x: centerX + Math.cos(angle) * distance,
          y: centerY - Math.abs(Math.sin(angle)) * distance - 50,
          depth: 1,
          parent: 'root',
          dataPulse: Math.random()
        });
      }

      // Level 2 - sub branches
      const level2Nodes = 8;
      for (let i = 0; i < level2Nodes; i++) {
        const parentIndex = Math.floor(Math.random() * level1Nodes);
        const parent = nodes.find(n => n.id === `l1_${parentIndex}`);
        if (parent) {
          const angle = (Math.PI * 2 * i) / level2Nodes + Math.random() * 0.5;
          const distance = 80 + Math.random() * 40;
          nodes.push({
            id: `l2_${i}`,
            x: parent.x + Math.cos(angle) * distance,
            y: parent.y - Math.abs(Math.sin(angle)) * distance - 30,
            depth: 2,
            parent: parent.id,
            dataPulse: Math.random()
          });
        }
      }

      // Level 3 - leaf nodes (data points)
      const level3Nodes = 15;
      for (let i = 0; i < level3Nodes; i++) {
        const parentIndex = Math.floor(Math.random() * level2Nodes);
        const parent = nodes.find(n => n.id === `l2_${parentIndex}`);
        if (parent) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 40 + Math.random() * 30;
          nodes.push({
            id: `l3_${i}`,
            x: parent.x + Math.cos(angle) * distance,
            y: parent.y - Math.abs(Math.sin(angle)) * distance - 20,
            depth: 3,
            parent: parent.id,
            dataPulse: Math.random()
          });
        }
      }

      return nodes;
    };

    const nodes = createTreeNodes();

    // Create links based on parent-child relationships
    const links: TreeLink[] = nodes
      .filter(n => n.parent)
      .map(n => ({
        source: n.parent!,
        target: n.id,
        dataFlow: Math.random()
      }));

    const simulation = d3
      .forceSimulation<TreeNode, TreeLink>(nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))
      .force('link', d3.forceLink<TreeNode, TreeLink>(links)
        .id((d: any) => d.id)
        .distance((d: any) => {
          const source = nodes.find(n => n.id === d.source.id);
          const target = nodes.find(n => n.id === d.target.id);
          if (source && target) {
            return 60 + (source.depth + target.depth) * 20;
          }
          return 80;
        })
        .strength(0.3))
      .velocityDecay(0.4);

    simulationRef.current = simulation;

    // Create gradient definitions for data flow animation
    const defs = svg.append('defs');

    // Create gradient for links
    const gradient = defs.append('linearGradient')
      .attr('id', 'dataFlowGradient')
      .attr('gradientUnits', 'userSpaceOnUse');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'rgba(0, 245, 255, 0.8)');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'rgba(155, 93, 229, 0.8)');

    // Create links group
    const linkGroup = svg.append('g').attr('class', 'links');

    const link = linkGroup
      .selectAll<SVGLineElement, TreeLink>('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (_d: any, i: number) => {
        const colors = [
          'rgba(0, 245, 255, 0.3)',
          'rgba(155, 93, 229, 0.3)',
          'rgba(247, 183, 49, 0.3)'
        ];
        return colors[i % colors.length];
      })
      .attr('stroke-width', (_d: any) => {
        return 1.5 + Math.random() * 1.5;
      })
      .attr('opacity', 0.6);

    // Create nodes group
    const nodeGroup = svg.append('g').attr('class', 'nodes');

    const node = nodeGroup
      .selectAll<SVGCircleElement, TreeNode>('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', (_d: TreeNode) => {
        const baseRadius = 3;
        return baseRadius + (3 - _d.depth) * 2;
      })
      .attr('fill', (d: TreeNode) => {
        const colors = [
          'rgba(0, 245, 255, 0.9)',
          'rgba(155, 93, 229, 0.8)',
          'rgba(247, 183, 49, 0.7)',
          'rgba(0, 245, 255, 0.6)'
        ];
        return colors[d.depth];
      })
      .attr('filter', 'drop-shadow(0 0 4px rgba(0, 245, 255, 0.6))');

    // Add pulsing effect to nodes
    const pulseNodes = () => {
      node
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr('r', (d: TreeNode) => {
          const baseRadius = 3;
          const pulse = Math.sin(Date.now() * 0.002 + d.dataPulse! * Math.PI * 2) * 0.5;
          return baseRadius + (3 - d.depth) * 2 + pulse;
        });
    };

    setInterval(pulseNodes, 100);

    // Animate data flow along links
    let flowOffset = 0;
    const animateDataFlow = () => {
      flowOffset = (flowOffset + 0.5) % 100;
      link.attr('stroke-dasharray', '5, 5')
        .attr('stroke-dashoffset', -flowOffset);
    };

    const flowInterval = setInterval(animateDataFlow, 30);

    const ticked = () => {
      node
        .attr('cx', (d: TreeNode) => d.x)
        .attr('cy', (d: TreeNode) => d.y);

      link
        .attr('x1', (d: any) => {
          const source = nodes.find(n => n.id === (d.source as any).id);
          return source?.x || 0;
        })
        .attr('y1', (d: any) => {
          const source = nodes.find(n => n.id === (d.source as any).id);
          return source?.y || 0;
        })
        .attr('x2', (d: any) => {
          const target = nodes.find(n => n.id === (d.target as any).id);
          return target?.x || 0;
        })
        .attr('y2', (d: any) => {
          const target = nodes.find(n => n.id === (d.target as any).id);
          return target?.y || 0;
        });
    };

    simulation.on('tick', ticked);

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        simulation.stop();
        clearInterval(flowInterval);
      } else {
        simulation.restart();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      svg.attr('width', newWidth).attr('height', newHeight);
      simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      clearInterval(flowInterval);
      simulation.stop();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      id="d3-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default NeuralBackground;
