import numpy as np


A = np.array([[1,2,3],
              [4,5,6],
              [7,8,9]])

B = np.array([[9,8,7],
              [6,5,4],
              [3,2,1]])

print(A@B)

# Define two matrices
C = np.array([[1,2,3],
              [4,5,6],
              [7,8,9]])

print("C, before transposition:", C, sep="\n")             # The original matrix
print("C.T:", A.T, sep="\n")                               # The transpose
print("C, after transposition (unchanged):", C, sep="\n")  # The original matrix, unchanged
