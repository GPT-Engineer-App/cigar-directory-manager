import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Box, Image, Tag, TagLabel, IconButton, Select, Textarea } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const Index = () => {
  const [cigars, setCigars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCigar, setNewCigar] = useState({
    brand: "",
    name: "",
    type: "",
    description: "",
    images: [],
    salesFormats: [],
    tags: [],
  });

  const [newSalesFormat, setNewSalesFormat] = useState({ quantity: "", format: "", retailers: [] });
  const [newRetailer, setNewRetailer] = useState({ name: "", price: "", link: "" });
  const [newTag, setNewTag] = useState("");

  const handleAddCigar = () => {
    const cigarWithImage = { ...newCigar, images: newCigar.images.length > 0 ? newCigar.images : [] };
    setCigars([...cigars, cigarWithImage]);
    setNewCigar({ brand: "", name: "", type: "", description: "", images: [], salesFormats: [], tags: [] });
  };

  const handleRemoveCigar = (index) => {
    const updatedCigars = cigars.filter((_, i) => i !== index);
    setCigars(updatedCigars);
  };

  const handleAddSalesFormat = () => {
    setNewCigar({ ...newCigar, salesFormats: [...newCigar.salesFormats, newSalesFormat] });
    setNewSalesFormat({ quantity: "", format: "", retailers: [] });
  };

  const handleAddRetailer = () => {
    setNewSalesFormat({ ...newSalesFormat, retailers: [...newSalesFormat.retailers, newRetailer] });
    setNewRetailer({ name: "", price: "", link: "" });
  };

  const handleAddTag = () => {
    setNewCigar({ ...newCigar, tags: [...newCigar.tags, newTag] });
    setNewTag("");
  };

  const filteredCigars = cigars.filter((cigar) => cigar.name.toLowerCase().includes(searchTerm.toLowerCase()) || cigar.tags.includes(searchTerm));

  return (
    <Container centerContent maxW="container.lg" py={8}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search cigars..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <IconButton aria-label="Search" icon={<FaSearch />} />
        </HStack>

        <Box width="100%" p={4} borderWidth={1} borderRadius="lg">
          <Text fontSize="xl" mb={4}>
            Add New Cigar
          </Text>
          <VStack spacing={4}>
            <Input placeholder="Brand" value={newCigar.brand} onChange={(e) => setNewCigar({ ...newCigar, brand: e.target.value })} />
            <Input placeholder="Name" value={newCigar.name} onChange={(e) => setNewCigar({ ...newCigar, name: e.target.value })} />
            <Input placeholder="Type" value={newCigar.type} onChange={(e) => setNewCigar({ ...newCigar, type: e.target.value })} />
            <Textarea placeholder="Description" value={newCigar.description} onChange={(e) => setNewCigar({ ...newCigar, description: e.target.value })} />
            <Input type="file" accept="image/*" onChange={(e) => setNewCigar({ ...newCigar, images: [URL.createObjectURL(e.target.files[0])] })} />
            <HStack>
              <Input placeholder="Tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
              <IconButton aria-label="Add Tag" icon={<FaPlus />} onClick={handleAddTag} />
            </HStack>
            <HStack>
              <Input placeholder="Quantity" value={newSalesFormat.quantity} onChange={(e) => setNewSalesFormat({ ...newSalesFormat, quantity: e.target.value })} />
              <Input placeholder="Format" value={newSalesFormat.format} onChange={(e) => setNewSalesFormat({ ...newSalesFormat, format: e.target.value })} />
              <IconButton aria-label="Add Sales Format" icon={<FaPlus />} onClick={handleAddSalesFormat} />
            </HStack>
            <HStack>
              <Input placeholder="Retailer Name" value={newRetailer.name} onChange={(e) => setNewRetailer({ ...newRetailer, name: e.target.value })} />
              <Input placeholder="Price" value={newRetailer.price} onChange={(e) => setNewRetailer({ ...newRetailer, price: e.target.value })} />
              <Input placeholder="Link" value={newRetailer.link} onChange={(e) => setNewRetailer({ ...newRetailer, link: e.target.value })} />
              <IconButton aria-label="Add Retailer" icon={<FaPlus />} onClick={handleAddRetailer} />
            </HStack>
            <Button onClick={handleAddCigar}>Add Cigar</Button>
          </VStack>
        </Box>

        <Box width="100%" p={4} borderWidth={1} borderRadius="lg">
          <Text fontSize="xl" mb={4}>
            Cigar Directory
          </Text>
          {filteredCigars.map((cigar, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="lg" mb={4}>
              <HStack justifyContent="space-between">
                <Text fontSize="lg">
                  {cigar.brand} - {cigar.name}
                </Text>
                <IconButton aria-label="Remove Cigar" icon={<FaTrash />} onClick={() => handleRemoveCigar(index)} />
              </HStack>
              <Text>Type: {cigar.type}</Text>
              <Text>Description: {cigar.description}</Text>
              {cigar.images.length > 0 && <Image src={cigar.images[0]} alt={cigar.name} />}
              <HStack>
                {cigar.tags.map((tag, i) => (
                  <Tag key={i} size="sm" variant="solid" colorScheme="teal">
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                ))}
              </HStack>
              {cigar.salesFormats.map((format, i) => (
                <Box key={i} mt={2}>
                  <Text>Quantity: {format.quantity}</Text>
                  <Text>Format: {format.format}</Text>
                  {format.retailers.map((retailer, j) => (
                    <Box key={j} ml={4}>
                      <Text>Retailer: {retailer.name}</Text>
                      <Text>Price: {retailer.price}</Text>
                      <Text>
                        Link:{" "}
                        <a href={retailer.link} target="_blank" rel="noopener noreferrer">
                          {retailer.link}
                        </a>
                      </Text>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
