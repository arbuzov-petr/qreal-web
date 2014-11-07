package com.qreal.robots.model;

import java.util.ArrayList;

/**
 * Created by vladzx on 05.11.14.
 */
public class Diagram {
    private long diagramId;
    private long nodeIndex;
    private ArrayList<DefaultDiagramNode> nodes;
    private ArrayList<Link> links;

    public long getDiagramId() {
        return diagramId;
    }

    public void setDiagramId(long diagramId) {
        this.diagramId = diagramId;
    }

    public long getNodeIndex() {
        return nodeIndex;
    }

    public void setNodeIndex(long nodeIndex) {
        this.nodeIndex = nodeIndex;
    }

    public ArrayList<DefaultDiagramNode> getNodes() {
        return nodes;
    }

    public ArrayList<Link> getLinks() {
        return links;
    }

    public void setNodes(ArrayList<DefaultDiagramNode> nodes) {
        this.nodes = nodes;
    }

    public void setLinks(ArrayList<Link> links) {
        this.links = links;
    }
}