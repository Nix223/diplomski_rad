import geopandas as gpd
import numpy as np


def main():

        aoi_boundary_HARV = gpd.read_file("MC2/data/StHimarkNeighborhoodShapefile/StHimark.shp")
        print (aoi_boundary_HARV)

        print(aoi_boundary_HARV.type)

        print(aoi_boundary_HARV.crs)
        print(aoi_boundary_HARV.bounds)


        aoi_boundary_HARV.plot(column="geometry", linewidth=2, legend=True, figsize=(20, 5))


main()